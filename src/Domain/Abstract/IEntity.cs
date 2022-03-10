﻿namespace Domain.Abstract
{
    public interface IEntity<out T>
    {
        public T Id { get; }
    }
}