using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.DBContext;
using API.Model;
using BackendCustoms.Controllers.CustomsData.Request;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.DepedencyInjections.Service.CeirService.Request;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendCustoms.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class OperationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IGetaccessTokenService _getToken;
        private readonly IGetSystemSetting _sys;
        private readonly ICEIR_API_Service _irdService;
        private readonly ICustomDataFilterAndSaveService _filterAndSaveService;
        public OperationController(ApplicationDbContext context,
         IHttpContextAccessor httpContextAccessor, IGetaccessTokenService getToken, IGetSystemSetting sys,
         ICEIR_API_Service irdService, ICustomDataFilterAndSaveService filterAndSaveService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _getToken = getToken;
            _sys = sys;
            _irdService = irdService;
            _filterAndSaveService = filterAndSaveService;
        }

        [HttpGet]
        [Route("SentList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> SentList(
                        DateTime? RoDateFrom,
                        DateTime? RoDateTo,
                        DateTime? SentDateFrom,
                        DateTime? SentDateTo,
                        string? CeirId,
                        string? RoNo,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Sent);
            if (SentDateFrom != null)
            {
                query = query.Where(x => x.SentDatetime >= SentDateFrom);
            }
            if (SentDateTo != null)
            {
                query = query.Where(x => x.SentDatetime <= SentDateTo);
            }
            if (RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= RoDateFrom);
            }
            if (RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= RoDateTo);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.MaccsCEIRID == CeirId);
            }
            if (!String.IsNullOrEmpty(RoNo))
            {
                query = query.Where(x => x.RONo == RoNo);
            }

            return await ApiResult<BackendCustoms.Model.CustomsData>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }

        [HttpGet]
        [Route("FailedList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> FailedList(
                         DateTime? RoDateFrom,
                        DateTime? RoDateTo,
                        DateTime? SentDateFrom,
                        DateTime? SentDateTo,
                        string? CeirId,
                        string? RoNo,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Failed);
            if (SentDateFrom != null)
            {
                query = query.Where(x => x.SentDatetime >= SentDateFrom);
            }
            if (SentDateTo != null)
            {
                query = query.Where(x => x.SentDatetime <= SentDateTo);
            }
            if (RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= RoDateFrom);
            }
            if (RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= RoDateTo);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.MaccsCEIRID == CeirId);
            }
            if (!String.IsNullOrEmpty(RoNo))
            {
                query = query.Where(x => x.RONo == RoNo);
            }

            return await ApiResult<BackendCustoms.Model.CustomsData>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }


        [HttpGet]
        [Route("NotSentList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> NotSentList(
                        DateTime? RoDateFrom,
                        DateTime? RoDateTo,
                        string? CeirId,
                        string? RoNo,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.NotSent);

            if (RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= RoDateFrom);
            }
            if (RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= RoDateTo);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.MaccsCEIRID == CeirId);
            }
            if (!String.IsNullOrEmpty(RoNo))
            {
                query = query.Where(x => x.RONo == RoNo);
            }

            return await ApiResult<BackendCustoms.Model.CustomsData>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }

        [HttpGet]
        [Route("DuplicateList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> DuplicateList(
                         DateTime? RoDateFrom,
                        DateTime? RoDateTo,
                        string? CeirId,
                        string? RoNo,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Duplicate);

            if (RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= RoDateFrom);
            }
            if (RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= RoDateTo);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.MaccsCEIRID == CeirId);
            }
            if (!String.IsNullOrEmpty(RoNo))
            {
                query = query.Where(x => x.RONo == RoNo);
            }

            return await ApiResult<BackendCustoms.Model.CustomsData>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCeirid(string id, EditCeiridRequest request)
        {

            var temp = await _context.CustomsDatas.Where(x => x.id == id).FirstOrDefaultAsync();
            if (temp != null)
            {
                // Get User from Token
                var user = await GetUserFromTokenAsync();
                #region User Activity Record
                var activity = new UserLog();
                activity.Description = AppConfig.EditDescription;
                activity.UserId = user?.Id;
                activity.FullName = user?.FullName;
                activity.LogDatetime = DateTime.Now;
                activity.OldData = temp.CEIRID;
                activity.NewData = request.ceirId;
                await _context.UserLogs.AddAsync(activity);
                #endregion

                temp.CEIRID = request.ceirId;
                temp.EditCeirid = temp.CEIRID;
                temp.Remark = request.remark;
                temp.EditBy = user?.FullName;
                temp.EditById = user?.Id;
                await _context.SaveChangesAsync();
                return Ok(temp);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpPost]
        public async Task<IActionResult> Send(SendRequest request)
        {
            var data = await _context.CustomsDatas.FirstOrDefaultAsync(x => x.id == request.id);
            if (data == null)
                return NotFound();
            if (data.CEIRID != null)
            {
                var isSent = await _context.ceiridFromIRDs.Where(x => x.CEIRID == data.CEIRID && x.IsSent == true).AnyAsync();
                if (isSent)
                {
                    return BadRequest("Fail to send becuase of duplicate case");
                }
            }
            // Get User from Token
            var user = await GetUserFromTokenAsync();
            #region User Activity Record
            var activity = new UserLog();
            activity.Description = AppConfig.ResendDescription;
            activity.UserId = user?.Id;
            activity.FullName = user?.FullName;
            activity.LogDatetime = DateTime.Now;
            activity.OldData = data.MaccsCEIRID;
            //activity.NewData = data.MaccsCEIRID;
            await _context.UserLogs.AddAsync(activity);
            await _context.SaveChangesAsync();
            #endregion


            // Get Token from External Service
            var token = await GetCeirTokenAsync(data);
            if (token == null)
                return BadRequest("Failed to acquire token.");

            // Send Confirmation to IRD
            var status = await SendPaymentConfirmationAsync(data, token);
            await _filterAndSaveService.SaveAccordingToStatus(data, status);

            // Update sent timestamp
            data.SentDatetime = DateTime.Now;

            await _context.SaveChangesAsync();

            if (status == HttpStatusCode.OK.ToString())
                return Ok(data);

            return StatusCode(500, new { message = "An error occurred while updating data." });
        }
        #region Helper Method for Send   
        private async Task<User?> GetUserFromTokenAsync()
        {
            var tokenValue = _getToken.GetaccessTokenAsync();
            var requestToken = await _context.TokenModels.FirstOrDefaultAsync(x => x.Token == tokenValue);

            if (requestToken == null)
                return null;

            return await _context.Users.FirstOrDefaultAsync(x => x.Id == requestToken.UserId);
        }

        private async Task<string?> GetCeirTokenAsync(BackendCustoms.Model.CustomsData data)
        {
            try
            {
                var setting = await _sys.GetAsync();
                var tokenRequest = new GetTokenRequest
                {
                    authUrl = setting.AuthorizationTokenURL_CEIR,
                    principal = setting.principal,
                    credentials = setting.credentials
                };

                return await _irdService.GetTokenAsync(tokenRequest);
            }
            catch (Exception)
            {
                await _filterAndSaveService.SaveAccordingToStatus(data, HttpStatusCode.InternalServerError.ToString());
                return null;
            }
        }

        private async Task<string> SendPaymentConfirmationAsync(BackendCustoms.Model.CustomsData data, string token)
        {
            var setting = await _sys.GetAsync();

            var confirmRequest = new ConfirmationRequest
            {
                body = new PaymentConfirmationRequest
                {
                    CeirId = data.CEIRID,
                    ReleaseOrderNumber = data.RONo,
                    DateTime = data.RODate,
                    SumCT = data.CT,
                    SumCD = data.CD,
                    SumAIT = data.AT,
                    SumRF = data.RF
                },
                ApiURl = setting.PaymentConfirmationURL_CEIR,
                Token = token
            };

            return await _irdService.PaymentConfirmation(confirmRequest);
        }

        #endregion
    }
}