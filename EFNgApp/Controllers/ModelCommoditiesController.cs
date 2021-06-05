using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EFNgApp.Models;

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


        [HttpGet]
        public ActionResult<List<ModelCommoditiesResult>> GetDataByModelCommodity()
        {
            var modelType = _context.ModelCommodity.Select(x => x.Type).Distinct().ToList();
            List<ModelCommoditiesResult> result = new List<ModelCommoditiesResult>();
            foreach (string model in modelType)
            {
                ModelCommoditiesResult mr = new ModelCommoditiesResult();
                mr.Type = model;
                mr.Records = _context.ModelCommodity.Where(x => x.Type == model).ToList();
                result.Add(mr);
            };

            return result;
        }

        
       [HttpGet]
         public async Task<ActionResult<IEnumerable<object>>> GetPnLByModelCommodity()
        {
            return await _context.ModelCommodity.GroupBy(x => x.Type).Select(x => new
            {
                Type = x.Key,
                TotalPnL = x.Sum(y => y.PnLdaily)
            }).ToListAsync();

        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPnLByModelCommodityAndContract()
        {
            return await _context.ModelCommodity.GroupBy(x => new { x.Type, x.Contract }).Select(x => new
            {
                Data = x.Key,
                PnL = x.Sum(y => y.PnLdaily)
            }).ToListAsync();

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPnLByMonth()
        {
            int year = DateTime.Now.Year;
            return await _context.ModelCommodity.GroupBy(x => new { x.Type, x.Date.Value.Year,x.Date.Value.Month }).Select(x => new
            {
                Data = x.Key,
                PnL = x.Sum(y => y.PnLdaily)
            }).ToListAsync();

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPnLByYear()
        {
            int year = DateTime.Now.Year;
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
