#ifndef WIRE_H
#define WIRE_H

#include "Link.h"
#include "Object.h"

class Wire : public Link, public Object {

public:
    virtual void move(int offX, int offY, int lastX, int lastY) override;
    virtual void draw(DrawingContext& context) const override;
};

#endif // WIRE_H
