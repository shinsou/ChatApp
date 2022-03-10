using Domain.Abstract;

namespace Domain
{
    public class Lobby : AuditableEntity<string>
    {
        public Lobby() { }
        public Lobby(string id) : base(id) { }

        public string Name { get; set; }
        public IEnumerable<Message> Messages { get; set; }
    }
}