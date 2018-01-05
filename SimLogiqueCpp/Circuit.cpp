#include "Circuit.h"

Circuit::~Circuit() {
    while(!_schematics.empty())
        deleteSchematic(_schematics.back());
}

Schematic& Circuit::createSchematic() {
    Schematic* schematic = new Schematic(this);
    _schematics.push_back(schematic);
    return *schematic;
}

void Circuit::deleteSchematic(Schematic *schematic) {
    delete schematic;
    _schematics.erase(std::find(_schematics.begin(), _schematics.end(), schematic));
}
