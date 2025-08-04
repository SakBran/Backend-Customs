using API.DBContext;
using API.Interface;
using API.Service;
using BackendCustoms.CRON;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.DepedencyInjections.Service;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IO;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContextPool<ApplicationDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        builder.Services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            var jwtKey = builder.Configuration["JWT:Key"] ?? throw new InvalidOperationException("JWT:Key is not configured.");
            var Key = Encoding.UTF8.GetBytes(jwtKey);
            o.SaveToken = true;
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["JWT:Issuer"],
                ValidAudience = builder.Configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Key)
            };
        });
        builder.Services.AddMemoryCache();
        builder.Services.AddHttpContextAccessor();

        builder.Services.AddScoped<IJWTManagerService, JWTManagerService>();
        builder.Services.AddScoped(typeof(ICommonService<>), typeof(CommonService<>));
        builder.Services.AddSingleton<IFileReaderService, FileReaderService>();
        builder.Services.AddScoped<IGetSystemSetting, GetSystemSetting>();
        builder.Services.AddSingleton<ICEIR_API_Service, CEIR_API_Service>();
        builder.Services.AddScoped<ICustomDataFilterAndSaveService, CustomDataFilterAndSaveService>();
        builder.Services.AddScoped(typeof(IReportFilterQueryService<>), typeof(ReportFilterQueryService<>));
        builder.Services.AddSingleton<IGetaccessTokenService, GetAccessTokenService>();


        builder.Services.AddHostedService<CronJobService>();
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseDeveloperExceptionPage();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseSwagger();
            app.UseDeveloperExceptionPage();
            //app.UseHsts();
            app.UseSwaggerUI();
        }

        // app.UseHttpsRedirection();
       

        // app.UseHttpsRedirection();
        #region Cors
        app.UseCors(
                      builder =>
                      {
                          builder.WithMethods("GET");
                          builder.WithMethods("PUT");
                          builder.WithMethods("POST");
                          //Make sure WebDAV Publishing and HTTP Redirection is unselected when install iis
                          builder.WithMethods("DELETE");
                          builder.WithMethods("*");
                          builder.WithHeaders("Authorization");
                          builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                          //Code capacitor://localhost for ios device 
                          //http://localhost for android device
                          //An origin is the combination of the protocol, domain, 
                          //and port from which your Ionic app or the external resource is served. 
                          //For example, apps running in 
                          //Capacitor have capacitor://localhost (iOS) or http://localhost (Android) as their origin. 
                          builder.WithOrigins(
                          "http://136.228.171.17:5080",
                          "http://136.228.171.17:5080/",
                          "https://136.228.171.17:5080",
                          "https://136.228.171.17:5080/",
                          "http://136.228.171.17:5280",
                          "http://136.228.171.17:5280/",
                          "https://136.228.171.17:5280",
                          "https://136.228.171.17:5280/"
                         ).AllowAnyMethod().AllowAnyHeader().AllowCredentials();

                      }
                  );
        #endregion

        // app.UseHttpsRedirection();
        app.UseRouting();
        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor
            | ForwardedHeaders.XForwardedProto
        });
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");
        app.MapControllers();
        app.Run();
    }
}