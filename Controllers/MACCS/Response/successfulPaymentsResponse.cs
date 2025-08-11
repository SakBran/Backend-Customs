using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace BackendCustoms.Controllers.IRD.Response
{
    public class successfulPaymentsResponse
    {
        [JsonPropertyName("DateTime")]
        [JsonProperty("DateTime")]
        public DateTime NotificationDateTime { get; set; }

        [JsonPropertyName("CeirId")]
        [JsonProperty("CeirId")]
        public required string CeirId { get; set; }

        [JsonPropertyName("ReleaseOrderNumber")]
        [JsonProperty("ReleaseOrderNumber")]
        public required string ReleaseOrderNumber { get; set; }

        [JsonPropertyName("SUM_CT")]
        [JsonProperty("SUM_CT")]
        public decimal SumCt { get; set; }

        [JsonPropertyName("SUM_CD")]
        [JsonProperty("SUM_CD")]
        public decimal SumCd { get; set; }

        [JsonPropertyName("SUM_AIT")]
        [JsonProperty("SUM_AIT")]
        public decimal SumAit { get; set; }

        [JsonPropertyName("SUM_RF")]
        [JsonProperty("SUM_RF")]
        public decimal SumRf { get; set; }
    }
}