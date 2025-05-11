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
        private readonly IFileReaderService _fileReader;
        private readonly ICEIR_API_Service _irdService;
        private readonly IServiceScopeFactory _scopeFactory;

        public CronJobService(
         ILogger<CronJobService> logger,
         IFileReaderService fileReader,
         ICEIR_API_Service irdService,
         IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _fileReader = fileReader;
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
                    await DoWork(scope);

                }
                await Task.Delay(_scheduleInterval, stoppingToken);
            }
        }

        private async Task DoWork(IServiceScope scope)
        {
            _logger.LogInformation("CronJobService is doing background work at: {time}", DateTimeOffset.Now);
            var _sys = scope.ServiceProvider.GetRequiredService<IGetSystemSetting>();
            var setting = await _sys.GetAsync();
            //File Reading
            var readList = _fileReader.ReadAndMoveFiles(setting);

            if (readList.Count != 0)
            {
                #region Get Send List From Read files to send IRD API
                var _filterAndSaveService = scope.ServiceProvider.GetRequiredService<ICustomDataFilterAndSaveService>();
                var sendList = await _filterAndSaveService.GetIrdToSendList(readList);
                #endregion

                if (sendList.Count != 0)
                {
                    try
                    {
                        #region Token Request
                        var tokenRequest = new GetTokenRequest
                        {
                            authUrl = setting.AuthorizationTokenURL_CEIR,
                            principal = setting.principal,
                            credentials = setting.credentials
                        };

                        var token = await _irdService.GetTokenAsync(tokenRequest);
                        #endregion

                        #region Send to IRD and Update Success/Fail Status on CustomData
                        foreach (var data in sendList)
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
                            var status = await _irdService.PaymentConfirmation(confirmRequest);
                            await _filterAndSaveService.SaveAccordingToStatus(data, status);
                        }
                        #endregion
                    }
                    catch (Exception ex)
                    {
                        _logger.LogInformation("IRD API Request Error:" + ex.Message);
                    }
                }
            }
            else
            {
                _logger.LogInformation("Nothing to read.");
            }
        }
    }

}