#include "WireJoint.h"

void WireJoint::move(int offX, int offY, int, int) {
    _x += offX;
    _y += offY;
}

void WireJoint::draw(DrawingContext& context) const {
    context.painter().drawEllipse(QPointF(_x*context.gridStep(),_y*context.gridStep()), 0.1*context.gridStep(), 0.1*context.gridStep());
}
