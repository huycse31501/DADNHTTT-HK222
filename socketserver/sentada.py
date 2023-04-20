import socketio
import eventlet
import paho.mqtt.client as mqtt
from paho.mqtt.client import *
import time

mqtt = mqtt.Client()
mqtt.username_pw_set(username='vananh2110211', password='aio_yvOA137AnyfMg0fRUHFpd1XXgwVQ')
mqtt.connect(host='io.adafruit.com', port=1883)

sio = socketio.Server(async_mode='eventlet',
                      cors_allowed_origins='http://localhost:3000')


def send_data_to_mqtt(data):
    mqtt.publish('vananh2110211/feeds/bbc-pump', int(data))

@sio.on('connect')
def connect(sid, environ):
    print(f"Client {sid} connected")


@sio.on('Hello')
def hello(sid, data):
    print(f"Received from client {sid}: {int(data)}")
    send_data_to_mqtt(data)
    sio.emit('Hello', 'back to you', room=sid)

@sio.on('hereistemp')
def hereistemp(sid, data):
    print(f"Tui nhan duoc nhiet do rui` {sid}: {str(data)}")
    sio.emit('whereishumid', 'back to you', room=sid)

@sio.on('hereishumid')
def hereishumid(sid, data):
    print(f"Tui nhan duoc do am rui` {sid}: {str(data)}")
    sio.emit('whereislight', 'back to you', room=sid)

@sio.on('hereislight')
def hereislight(sid, data):
    print(f"Tui nhan duoc anh sang rui` {sid}: {str(data)}")
    sio.emit('whereistimefrom', 'back to you', room=sid)

@sio.on('hereistimefrom')
def hereislight(sid, data):
    print(f"Tui nhan duoc ngay bat dau tuoi rui` {sid}: {str(data)}")
    sio.emit('whereistimeto', 'back to you', room=sid)


@sio.on('hereistimeto')
def hereislight(sid, data):
    print(f"Tui nhan duoc ngay ket thuc tuoi rui` {sid}: {str(data)}")
    sio.emit('whereistimestart', 'back to you', room=sid)

@sio.on('hereistimestart')
def hereislight(sid, data):
    print(f"Tui nhan duoc gio bat dau tuoi rui` {sid}: {str(data)}")
    sio.emit('whereistimeend', 'back to you', room=sid)
    

@sio.on('hereistimeend')
def hereislight(sid, data):
    print(f"Tui nhan duoc gio ket thuc tuoi rui` {sid}: {str(data)}")
    sio.emit('whereisarea', 'back to you', room=sid)
    
    
@sio.on('hereisarea')
def hereislight(sid, data):
    print(f"Tui nhan duoc khu vuc can tuoi roi` {sid}: {str(data)}")
    sio.emit('whereistimeinterval', 'back to you', room=sid)

@sio.on('hereistimeinterval')
def hereislight(sid, data):
    print(f"Tui nhan duoc thoi gian tuoi tung lan (phut) roi` {sid}: {str(data)}")
    sio.emit('all', 'OK tui da nhan dc het, cam on client nhiu nha <3', room=sid)

@sio.on('disconnect')
def disconnect(sid):
    print(f"Client {sid} disconnected")


if __name__ == '__main__':
    app = socketio.WSGIApp(sio)
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 6556)), app)
