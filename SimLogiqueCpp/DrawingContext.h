#ifndef DRAWINGCONTEXT_H
#define DRAWINGCONTEXT_H

#include <QPainter>

class DrawingContext {
public:
    DrawingContext(QPainter& painter) : _painter(painter) {}

    QPainter& painter() const {return _painter; }
    int gridStep() const { return _gridStep; }

private:
    QPainter& _painter;
    int _gridStep = 10;
};

#endif // DRAWINGCONTEXT_H
