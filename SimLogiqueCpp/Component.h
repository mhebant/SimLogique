#ifndef COMPONENT_H
#define COMPONENT_H

#include <vector>

class Schematic;
class Pin;
#include "Object.h"
#include "DrawingContext.h"

class Component : public Object {
protected:
    friend class ComponentFactory;
    Component(Schematic* parent, int x, int y, int width, int height, Orientation orientation) : Object(parent), _x(x), _y(y), _width(width), _height(height), _orientation(orientation) {}
    virtual ~Component();

public:
    int x() const { return _x; }
    int y() const { return _y; }
    int width() const { return _width; }
    int height() const { return _height; }
    Orientation orientation() const { return _orientation; }
    virtual void draw(DrawingContext& context) const override;
    virtual void move(int offX, int offY, int lastX, int lastY) override;
    virtual void update() = 0;

protected:
    Pin& createPin(int x, int y, Orientation orientation, std::string name);
    void deletePin(Pin* pin);
    void deletePin(Pin& pin) { deletePin(&pin); }

private:
    std::vector<Pin*> _pins;
    int _x;
    int _y;
    int _width;
    int _height;
    Orientation _orientation;
};

class ComponentFactory : public ObjectFactory {
protected:
    virtual Object* build_new(Schematic* parent) const override = 0;
};

#include "Schematic.h"
#include "Pin.h"

#endif // COMPONENT_H
