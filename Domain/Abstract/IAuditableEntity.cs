namespace Domain.Abstract
{
    public interface IAuditableEntity<T>
    {
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}