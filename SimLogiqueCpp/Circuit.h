#ifndef CIRCUIT_H
#define CIRCUIT_H

#include <vector>

class Schematic;
class Connection;

class Circuit {
public:
    Circuit() {}
    ~Circuit();
    Circuit (const Circuit&) = delete;
    Circuit& operator= (const Circuit&) = delete;

    Schematic& createSchematic();
    void deleteSchematic(Schematic* schematic);
    void deleteSchematic(Schematic& schematic) { deleteSchematic(&schematic); }

private:
    std::vector<Schematic*> _schematics;
    friend class Connection;
    std::vector<Connection*> _connections;
};

#include "Schematic.h"
#include "Connection.h"

#endif // CIRCUIT_H
