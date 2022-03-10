namespace Domain.Abstract
{
    public abstract class AuditableEntity<T> : IEntity<T>, IAuditableEntity<string>, IUserAuditEntity<string>
    {
        public AuditableEntity() { }

        public AuditableEntity(T id)
        {
            Id = id;
        }

        public T Id { get; }

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}