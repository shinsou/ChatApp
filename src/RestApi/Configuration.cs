using Serilog;

static class Configuration
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder app)
    {
        var services = app.Services;

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddCors(options =>
        {
            if (app.Environment.IsDevelopment())
            {
                options.AddPolicy(
                    "DefaultCorsPolicy",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                );
            }
        });

        return app;
    }

    public static WebApplicationBuilder ConfigureLogging(this WebApplicationBuilder app)
    {
        app.Host.UseSerilog(BuildSerilogConfigurations);

        return app;
    }

    public static WebApplication ConfigureApi(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        
        app.UseStaticFiles();

        app.MapControllers();
        app.UseRouting();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        app.MapFallbackToFile("index.html");

        app.Use(async (context, next) =>
        {
            context.Response.OnStarting(() =>
            {
                context.Response.Headers.Add("Content-Security-Policy", "default-src 'self';style-src 'self'");

                return Task.CompletedTask;
            });

            await next();
        });

        return app;
    }

    public static void BuildSerilogConfigurations(HostBuilderContext builderContext, IServiceProvider serviceProvider, LoggerConfiguration conf)
    {
        conf.ReadFrom.Configuration(builderContext.Configuration);
    }
}