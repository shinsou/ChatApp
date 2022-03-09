using Domain.Abstract;

namespace Domain
{
    public class Member : AuditableEntity<string>
    {
        public Member() { }
        public Member(string id) : base(id) { }

        public string Name { get; set; }
    }
}