#include <iostream>
#include <QApplication>

#include "Renderer.h"
#include "Circuit.h"
#include "Pin.h"

#include "Components/AndGate.h"

using namespace std;

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    Circuit circuit;
    Schematic& schematic = circuit.createSchematic();
    Object& ag = schematic.createObject(AndGateFactory());
    ag.move(5,5,0,0);
    Renderer test(schematic);
    test.show();

    cout << "Hello World!" << endl;

    return app.exec();
}
