using Domain;

namespace Application.Abstracts
{
    public interface ILobbiesRepository
    {
        Task<IEnumerable<Lobby>> GetAsync(CancellationToken cancellationToken);
    }
}