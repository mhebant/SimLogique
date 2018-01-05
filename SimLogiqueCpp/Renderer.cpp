#include "Renderer.h"

#include <QPainter>
#include <QDebug>

void Renderer::paintEvent(QPaintEvent*) {
    qDebug() << "Draw";
    QPainter painter(this);

    DrawingContext context(painter);
    _schematic->draw(context);

    painter.setPen(Qt::blue);
    painter.setFont(QFont("Arial", 30));
    painter.drawText(rect(), Qt::AlignCenter, "Qt");
}
