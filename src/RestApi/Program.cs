WebApplication
    .CreateBuilder(args)
    .ConfigureLogging()
    .ConfigureServices()
    .Build()
    .ConfigureApi()
    .Run();