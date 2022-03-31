using Application.Abstracts;
using Domain;
using Domain.Abstract;

namespace Application.UseCases.ShowAvailableLobbies
{
    public class ShowAvailableLobbiesInteractor : IInteractor<IEnumerable<Lobby>>
    {
        private readonly ILobbiesRepository lobbiesRepository;

        public ShowAvailableLobbiesInteractor(ILobbiesRepository lobbiesRepository)
        {
            this.lobbiesRepository = lobbiesRepository;
        }

        public async Task<TViewModel> HandleAsync<TViewModel>(IPresenter<TViewModel, IEnumerable<Lobby>> presenter, CancellationToken cancellationToken = default)
        {
            var result = await lobbiesRepository.GetAsync(cancellationToken);

            return presenter.Process(result);
        }
    }
}