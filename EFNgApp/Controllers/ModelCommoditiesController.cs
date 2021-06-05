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
        public ActionResult<IEnumerable<object>> GetModelCommodity()
        {
            var data = _context.ModelCommodity.ToList();
            var result = new List<object>();

            foreach (var model in data.GroupBy(x => x.Type).Select(x => x.Key).ToList())
            {
                var dataByModel = data.Where(x => x.Type == model).ToList();
                decimal? maxPnL = 0;
                decimal? cumPnL = 0;
                foreach (var record in dataByModel)
                {
                    cumPnL += record.PnLdaily;
                    if (maxPnL < cumPnL) maxPnL = cumPnL;
                    result.Add(new
                    {
                        Type = record.Type,
                        Date = record.Date,
                        Price = record.Price,
                        Position = record.Position,
                        NewTradeAction = record.NewTradeAction,
                        PnLDaily = record.PnLdaily,
                        Contract = record.Contract,
                        CumPnL = cumPnL,
                        DrowdownPnL = maxPnL - cumPnL
                    });
                }
            }

            return result;
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
            }

            ;

            return result;
        }


        // GET: api/ModelCommodities/GetPnLByModelCommodity
        [HttpGet]
        public List<List<object>> GetPnLByModelCommodity()
        {
            return _context.ModelCommodity.GroupBy(x => x.Type)
                .Select(x => new List<object>(){x.Key, x.Sum(y => y.PnLdaily)})
                .ToList();
        }


        // GET: api/ModelCommodities/GetPnLByModelCommodityAndContract
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPnLByModelCommodityAndContract()
        {
            return await _context.ModelCommodity.GroupBy(x => new {x.Type, x.Contract}).Select(x => new
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
            return await _context.ModelCommodity.GroupBy(x => new {x.Type, x.Date.Value.Year, x.Date.Value.Month})
                .Select(x => new
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
            return await _context.ModelCommodity.GroupBy(x => new {x.Type, x.Date.Value.Year}).Select(x => new
            {
                Data = x.Key,
                PnL = x.Sum(y => y.PnLdaily)
            }).ToListAsync();
        }

        // GET: api/ModelCommodities/GetDashboardData
        [HttpGet]
        public ActionResult<IEnumerable<object>> GetDashboardData()
        {
            var year = DateTime.Now.Year;

            var data = _context.ModelCommodity.ToList();
            var result = new List<object>();

            foreach (var modelCommodity in data.GroupBy(x => x.Type).Select(x => x.Key).ToList())
            {
                var dataByModel = data.Where(x => x.Type == modelCommodity).OrderByDescending(x => x.Date).ToList();
                var dataYtD = dataByModel.Where(x => x.Date >= new DateTime(year - 1, 1, 1) && x.Date <= DateTime.Now)
                    .OrderByDescending(x => x.Date).ToList();
                decimal? maxPnL = 0;
                decimal? drawdownPnL = 0;
                decimal? ytd = 0;
                foreach (var model in dataYtD)
                {
                    ytd += model.PnLdaily;
                    if (maxPnL < ytd) maxPnL = ytd;
                }

                drawdownPnL = maxPnL - ytd;
                object objModelCommodity = new
                {
                    type = modelCommodity,
                    pnlYtd = ytd,
                    pnlLtd = dataByModel.Sum(y => y.PnLdaily),
                    drawdownYTD = drawdownPnL,
                    currentPnL = dataByModel.Select(x => x.PnLdaily).FirstOrDefault(),
                    currentPrice = dataByModel.Select(x => x.Price).FirstOrDefault(),
                    currentPosition = dataByModel.Select(x => x.Position).FirstOrDefault(),
                };

                result.Add(objModelCommodity);
            }

            return result;
        }
    }

    public class ModelCommoditiesResult
    {
        public string Type { get; set; }
        public List<ModelCommodity> Records { get; set; }
    }
}