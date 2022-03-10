namespace Domain.Abstract
{
    public interface IPresenter<out TOut, in TIn>
    {
        TOut Process(TIn input);
    }
}