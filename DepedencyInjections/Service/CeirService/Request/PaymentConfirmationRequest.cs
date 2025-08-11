using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace BackendCustoms.DepedencyInjections.Service.CeirService.Request
{
    public class PaymentConfirmationRequest
    {

        [JsonPropertyName("CeirId")]
        [JsonProperty("CeirId")]
        public string? CeirId { get; set; }


        [JsonPropertyName("ReleaseOrderNumber")]
        [JsonProperty("ReleaseOrderNumber")]
        public string? ReleaseOrderNumber { get; set; }


        [JsonPropertyName("DateTime")]
        [JsonProperty("DateTime")]
        public string? DateTime { get; set; }


        [JsonPropertyName("SUM_CT")]
        [JsonProperty("SUM_CT")]
        public decimal? SumCT { get; set; } // Commercial Tax


        [JsonPropertyName("SUM_CD")]
        [JsonProperty("SUM_CD")]
        public decimal? SumCD { get; set; } // Customs Duty


        [JsonPropertyName("SUM_AIT")]
        [JsonProperty("SUM_AIT")]
        public decimal? SumAIT { get; set; } // Advanced Income Tax


        [JsonPropertyName("SUM_RF")]
        [JsonProperty("SUM_RF")]
        public decimal? SumRF { get; set; } // Penalties
    }
}