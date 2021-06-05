using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EFNgApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFNgApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ModelCommoditiesController : ControllerBase
    {
        private readonly AA_DHContext _context;

        public ModelCommoditiesController(AA_DHContext context)
        {
            _context = context;
        }

        // GET: api/ModelCommodities/GetModelCommodity
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ModelCommodity>>> GetModelCommodity()
        {
            return await _context.ModelCommodity.ToListAsync();
        }


        // GET: api/ModelCommodities/GetDataByModelCommodity
        [HttpGet]
        public ActionResult<List<ModelCommoditiesResult>> GetDataByModelCommodity()
        {
            var modelType = _context.ModelCommodity.Select(x => x.Type).Distinct().ToList();
            var result = new List<ModelCommoditiesResult>();
            foreach (var model in modelType)
            {
                var mr = new ModelCommoditiesResult
                {
                    Type = model, Records = _context.ModelCommodity.Where(x => x.Type == model).ToList()
                };
                result.Add(mr);
            };

            return result;
        }

        
        // GET: api/ModelCommodities/GetPnLByModelCommodity
       [HttpGet]
         public async Task<ActionResult<IEnumerable<object>>> GetPnLByModelCommodity()
        {
            return await _context.ModelCommodity.GroupBy(x => x.Type).Select(x => new
            {
                Type = x.Key,
                TotalPnL = x.Sum(y => y.PnLdaily)
            }).ToListAsync();

        }


         // GET: api/ModelCommodities/GetPnLByModelCommodityAndContract
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPnLByModelCommodityAndContract()
        {
            return await _context.ModelCommodity.GroupBy(x => new { x.Type, x.Contract }).Select(x => new
            {
                Data = x.Key,
                PnL = x.Sum(y => y.PnLdaily)
            }).ToListAsync();

        }

        // GET: api/ModelCommodities/GetPnLByMonth
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPnLByMonth()
        {
            var year = DateTime.Now.Year;
            return await _context.ModelCommodity.GroupBy(x => new { x.Type, x.Date.Value.Year,x.Date.Value.Month }).Select(x => new
            {
                Data = x.Key,
                PnL = x.Sum(y => y.PnLdaily)
            }).ToListAsync();

        }

        // GET: api/ModelCommodities/GetPnLByYear
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPnLByYear()
        {
            var year = DateTime.Now.Year;
            return await _context.ModelCommodity.GroupBy(x => new { x.Type, x.Date.Value.Year }).Select(x => new
            {
                Data = x.Key,
                PnL = x.Sum(y => y.PnLdaily)
            }).ToListAsync();

        }
    }

    public class ModelCommoditiesResult
    {
        public string Type { get; set; }
        public List<ModelCommodity> Records { get; set; }
    }
}
