using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EFNgApp.Models
{
    public partial class ModelCommodity
    {
        public DateTime? Date { get; set; }
        public string Contract { get; set; }
        public decimal? Price { get; set; }
        public short? Position { get; set; }
        public short? NewTradeAction { get; set; }
        public decimal? PnLdaily { get; set; }
        public int Id { get; set; }
        public string Type { get; set; }
    }
}
