#include "Schematic.h"
#include "Component.h"
#include "Exception.h"

Schematic::~Schematic() {
    while(!_objects.empty())
        deleteObject(_objects.back());
}

void Schematic::draw(DrawingContext& context) const {
    foreach (Object* object, _objects) {
        object->draw(context);
    }
}

Object& Schematic::createObject(ObjectFactory const& factory) {
    Object* object = factory.build_new(this);
    _objects.push_back(object);
    return *object;
}

void Schematic::deleteObject(Object* object) {
    auto it = std::find(_objects.begin(), _objects.end(), object);
    if(it == _objects.end())
        throw BasicException("No such object to delete in this Schematic");
    delete object;
    _objects.erase(it);
}

void Schematic::update() {
    foreach (Object* object, _objects) {
        Component* component = dynamic_cast<Component*>(object);
        if(component != nullptr)
            component->update();
    }
}
