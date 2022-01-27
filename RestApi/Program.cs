WebApplication.CreateBuilder(args)
    .ConfigureServices()
    .Build()
    .ConfigureApi()
    .Run();