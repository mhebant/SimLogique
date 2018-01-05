#ifndef RENDERER_H
#define RENDERER_H

#include <QWidget>

#include "Schematic.h"
#include "DrawingContext.h"

class Renderer : public QWidget{
    Q_OBJECT
public:
    Renderer(Schematic& schematic) : _schematic(&schematic) {}
    Schematic& schematic() { return *_schematic; }
    void setSchematic(Schematic& schematic) { _schematic = &schematic; }

    virtual void paintEvent(QPaintEvent*) override;

private:
    Schematic* _schematic;

};

#endif // RENDERER_H
