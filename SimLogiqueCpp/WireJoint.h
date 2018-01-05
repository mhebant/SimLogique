#ifndef WIREJOINT_H
#define WIREJOINT_H

class Schematic;
#include "Connector.h"
#include "Object.h"
#include "DrawingContext.h"

class WireJoint : public Connector, public Object {
private:
    WireJoint(Schematic* schematic): Object(schematic) {}

public:
    int x() { return _x; }
    void setX(int x) { _x = x; }
    int y() { return _y; }
    void setY(int y) { _y = y; }

    virtual void move(int offX, int offY, int lastX, int lastY) override;
    virtual void draw(DrawingContext& context) const override;

private:
    int _x;
    int _y;
};

#include "Schematic.h"

#endif // WIREJOINT_H
