using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Controllers.CustomsData.Request
{
    public class SentListRequest
    {
        public DateTime? RoDateFrom { get; set; }
        public DateTime? RoDateTo { get; set; }
        public DateTime? SentDateFrom { get; set; }
        public DateTime? SentDateTo { get; set; }
        public string? CeirId { get; set; }
        public string? RoNo { get; set; }
    }
}