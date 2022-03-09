namespace Domain.Abstract
{
    public interface IUserAuditEntity<T>
    {
        public T CreatedBy { get; set; }
        public T UpdatedBy { get; set; }
    }
}