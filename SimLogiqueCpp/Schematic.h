#ifndef SCHEMATIC_H
#define SCHEMATIC_H

#include <vector>

class Object;
class ObjectFactory;
#include "Circuit.h"
#include "DrawingContext.h"

class Schematic {
    Schematic (const Schematic&) = delete;
    Schematic& operator= (const Schematic&) = delete;
private:
    friend class Circuit;
    Schematic(Circuit* parent) : _circuit(*parent) {}
    ~Schematic();

public:
    Circuit& circuit() const { return _circuit; }
    void drop() { _circuit.deleteSchematic(this); }
    void draw(DrawingContext& context) const;
    Object& createObject(ObjectFactory const& factory);
    void deleteObject(Object* object);
    void deleteObject(Object& object) { deleteObject(&object); }
    void update();

private:
    Circuit& _circuit;
    std::vector<Object*> _objects;
};

#include "Object.h"

#endif // SCHEMATIC_H
