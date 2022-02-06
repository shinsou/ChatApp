using Serilog;

static class Configuration
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder app)
    {
        var services = app.Services;

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

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

        app.UseAuthorization();

        app.MapControllers();

        return app;
    }

    public static void BuildSerilogConfigurations(HostBuilderContext builderContext, IServiceProvider serviceProvider, LoggerConfiguration conf)
    {
        conf.ReadFrom.Configuration(builderContext.Configuration);
    }
}