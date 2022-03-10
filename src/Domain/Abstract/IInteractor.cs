namespace Domain.Abstract
{
    public interface IInteractor<out TResult>
    {
        Task<TViewModel> HandleAsync<TViewModel>(IPresenter<TViewModel, TResult> presenter, CancellationToken cancellationToken = default);
    }

    public interface IInteractor<out TResult, in T>
    {
        Task<TViewModel> HandleAsync<TViewModel>(IPresenter<TViewModel, TResult> presenter, T input, CancellationToken cancellationToken = default);
    }

    public interface IInteractorAsync<out TResult>
    {
        Task<TViewModel> HandleAsync<TViewModel>(IPresenter<Task<TViewModel>, TResult> presenter, CancellationToken cancellationToken = default);
    }

    public interface IInteractorAsync<out TResult, in T>
    {
        Task<TViewModel> HandleAsync<TViewModel>(IPresenter<Task<TViewModel>, TResult> presenter, T input, CancellationToken cancellationToken = default);
    }
}