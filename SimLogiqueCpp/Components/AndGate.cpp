#include "AndGate.h"

#include <math.h>
#include <QDebug>

AndGate::AndGate(Schematic* parent, int _x, int _y, Orientation orientation) : Component(parent, _x, _y, 4, 4, Orientation::up),
    _A(createPin(x()-1, y()-1, Orientation::left, "A")),
    _B(createPin(x()-1, y()+3, Orientation::left, "B")),
    _S(createPin(x()+5, y()+2, Orientation::right, "S"))
{
}

void AndGate::draw(DrawingContext &context) const {
    qDebug() << "DDDDD";
    QPainter& painter = context.painter();
    painter.save();
    switch(orientation()) {
    case Orientation::up:
        painter.translate(x()*context.gridStep(), y()*context.gridStep());
        break;
    case Orientation::left:
        painter.translate((x()+width())*context.gridStep(), y()*context.gridStep());
        break;
    case Orientation::down:
        painter.translate((x()+width())*context.gridStep(), (y()+height())*context.gridStep());
        break;
    case Orientation::right:
        painter.translate(x()*context.gridStep(), (y()+height())*context.gridStep());
        break;
    }
    painter.rotate(-static_cast<int>(orientation())*360*16/4);

    QPainterPath path;
    path.moveTo(0, 0);
    path.lineTo(0, 4*context.gridStep());
    path.arcTo(-context.gridStep()*4, 0, context.gridStep()*8, context.gridStep()*4, -90, 180);
    painter.drawPath(path);

    painter.restore();
}

void AndGate::update() {
    _S.value(_A.value() && _B.value());
}
