using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Interface;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.DepedencyInjections.Service.CeirService.Request;
using BackendCustoms.Model;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BackendCustoms.CRON
{
    public class CronJobService : BackgroundService
    {
        private readonly ILogger<CronJobService> _logger;
        private readonly TimeSpan _scheduleInterval = TimeSpan.FromSeconds(5); // simulate CRON (e.g., every 5 mins)
        // private readonly IGetSystemSetting _sys;
        private readonly IFileReaderService _fileReader;
        // private readonly ICommonService<CustomsData> _customDataService;
        private readonly ICEIR_API_Service _irdService;
        private readonly IServiceScopeFactory _scopeFactory;

        public CronJobService(
         ILogger<CronJobService> logger,
        //  IGetSystemSetting sys,
         IFileReaderService fileReader,
        //  ICommonService<CustomsData> customDataService,
         ICEIR_API_Service irdService,
         IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            // _sys = sys;
            _fileReader = fileReader;
            // _customDataService = customDataService;
            _irdService = irdService;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("CronJobService started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    try
                    {
                        await DoWork(scope);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogInformation("Error :" + ex.Message);
                    }


                }
                await Task.Delay(_scheduleInterval, stoppingToken);
            }
        }

        private async Task DoWork(IServiceScope scope)
        {
            _logger.LogInformation("CronJobService is doing background work at: {time}", DateTimeOffset.Now);
            var _sys = scope.ServiceProvider.GetRequiredService<IGetSystemSetting>();
            var setting = await _sys.GetAsync();
            var readList = _fileReader.ReadAndMoveFiles(setting);

            var _customDataService = scope.ServiceProvider.GetRequiredService<ICommonService<CustomsData>>();
            await _customDataService.CreateList(readList);

            var tokenRequest = new GetTokenRequest
            {
                authUrl = setting.AuthorizationTokenURL_CEIR,
                principal = setting.principal,
                credentials = setting.credentials
            };
            var token = await _irdService.GetTokenAsync(tokenRequest);
            foreach (var data in readList)
            {

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
                await _irdService.PaymentConfirmation(confirmRequest);
            }
        }
    }

}