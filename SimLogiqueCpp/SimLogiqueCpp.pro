TEMPLATE = app
CONFIG += console c++11
CONFIG += app_bundle
CONFIG += qt

QT += widgets
QT += gui

SOURCES += main.cpp \
    Renderer.cpp \
    Schematic.cpp \
    Circuit.cpp \
    DrawingContext.cpp \
    Connection.cpp \
    Component.cpp \
    Exception.cpp \
    Wire.cpp \
    Pin.cpp \
    Connector.cpp \
    Link.cpp \
    Object.cpp \
    WireJoint.cpp \
    Components/AndGate.cpp

HEADERS += \
    Renderer.h \
    Schematic.h \
    Circuit.h \
    DrawingContext.h \
    Connection.h \
    Component.h \
    Exception.h \
    Wire.h \
    Pin.h \
    Connector.h \
    Link.h \
    Object.h \
    WireJoint.h \
    Components/AndGate.h
