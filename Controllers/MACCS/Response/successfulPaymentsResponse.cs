using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Controllers.IRD.Response
{
    public class successfulPaymentsResponse
    {
        public DateTime NotificationDateTime { get; set; }
        public required string CeirId { get; set; }
        public required string ReleaseOrderNumber { get; set; }
        public decimal SumCt { get; set; }
        public decimal SumCd { get; set; }
        public decimal SumAit { get; set; }
        public decimal SumRf { get; set; }
    }
}