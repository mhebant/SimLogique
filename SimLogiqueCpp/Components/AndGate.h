#ifndef ANDGATE_H
#define ANDGATE_H

#include "Component.h"

class AndGate : public Component {
protected:
    friend class AndGateFactory;
    AndGate(Schematic* parent, int x, int y, Orientation orientation);
    virtual ~AndGate() {}

public:
    virtual void draw(DrawingContext& context) const override;
    virtual void update() override;

private:
    Pin& _A;
    Pin& _B;
    Pin& _S;
};

class AndGateFactory : public ComponentFactory {
protected:
    virtual Object* build_new(Schematic *parent) const override { return new AndGate(parent, 0, 0, Orientation::up); }
};

#endif // ANDGATE_H
