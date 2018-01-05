#ifndef OBJECT_H
#define OBJECT_H

#include "Schematic.h"
#include "DrawingContext.h"

class Object {
    Object (const Object&) = delete;
    Object& operator= (const Object&) = delete;
protected:
    friend class ObjectFactory;
    Object(Schematic* parent) : _schematic(*parent) {}
    friend class Schematic;
    virtual ~Object() {}

public:
    Schematic& schematic() { return _schematic; }
    virtual void drop() { _schematic.deleteObject(this); }
    virtual void draw(DrawingContext& context) const = 0;
    virtual void move(int offX, int offY, int lastX, int lastY) = 0;

private:
    Schematic& _schematic;
};

class ObjectFactory {
protected:
    friend class Schematic;
    virtual Object* build_new(Schematic* parent) const = 0;
};

#endif // OBJECT_H
