using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using API.Model;
using BackendCustoms.Controllers.CustomsData.Request;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendCustoms.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomsDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomsDataController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("SentList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> SentList(
                        SentListRequest filter,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string sortColumn = null,
                        string sortOrder = null,
                        string filterColumn = null,
                        string filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Sent);
            if (filter.SentDateFrom != null)
            {
                query = query.Where(x => x.SentDatetime >= filter.SentDateFrom);
            }
            if (filter.SentDateTo != null)
            {
                query = query.Where(x => x.SentDatetime <= filter.SentDateTo);
            }
            if (filter.RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= filter.RoDateFrom);
            }
            if (filter.RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= filter.RoDateTo);
            }
            if (!String.IsNullOrEmpty(filter.CeirId))
            {
                query = query.Where(x => x.MACCSCEIRID == filter.CeirId);
            }
            if (!String.IsNullOrEmpty(filter.RoNo))
            {
                query = query.Where(x => x.RONo == filter.RoNo);
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

        [HttpPost]
        [Route("FailedList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> FailedList(
                        SentListRequest filter,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string sortColumn = null,
                        string sortOrder = null,
                        string filterColumn = null,
                        string filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Failed);
            if (filter.SentDateFrom != null)
            {
                query = query.Where(x => x.SentDatetime >= filter.SentDateFrom);
            }
            if (filter.SentDateTo != null)
            {
                query = query.Where(x => x.SentDatetime <= filter.SentDateTo);
            }
            if (filter.RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= filter.RoDateFrom);
            }
            if (filter.RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= filter.RoDateTo);
            }
            if (!String.IsNullOrEmpty(filter.CeirId))
            {
                query = query.Where(x => x.MACCSCEIRID == filter.CeirId);
            }
            if (!String.IsNullOrEmpty(filter.RoNo))
            {
                query = query.Where(x => x.RONo == filter.RoNo);
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


        [HttpPost]
        [Route("NotSentList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> NotSentList(
                        SentListRequest filter,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string sortColumn = null,
                        string sortOrder = null,
                        string filterColumn = null,
                        string filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.NotSent);

            if (filter.RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= filter.RoDateFrom);
            }
            if (filter.RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= filter.RoDateTo);
            }
            if (!String.IsNullOrEmpty(filter.CeirId))
            {
                query = query.Where(x => x.MACCSCEIRID == filter.CeirId);
            }
            if (!String.IsNullOrEmpty(filter.RoNo))
            {
                query = query.Where(x => x.RONo == filter.RoNo);
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

        [HttpPost]
        [Route("DuplicateList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> DuplicateList(
                        SentListRequest filter,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string sortColumn = null,
                        string sortOrder = null,
                        string filterColumn = null,
                        string filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Duplicate);

            if (filter.RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= filter.RoDateFrom);
            }
            if (filter.RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= filter.RoDateTo);
            }
            if (!String.IsNullOrEmpty(filter.CeirId))
            {
                query = query.Where(x => x.MACCSCEIRID == filter.CeirId);
            }
            if (!String.IsNullOrEmpty(filter.RoNo))
            {
                query = query.Where(x => x.RONo == filter.RoNo);
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
    }
}