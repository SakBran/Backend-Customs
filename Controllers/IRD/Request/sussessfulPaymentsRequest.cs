using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Controllers.IRD.Request
{
    public class sussessfulPaymentsRequest
    {
        public required DateTime beginDate { get; set; }
        public required DateTime endDate { get; set; }
    }
}