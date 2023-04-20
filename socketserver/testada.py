from yolobit import *
button_a.on_pressed = None
button_b.on_pressed = None
button_a.on_pressed_ab = button_b.on_pressed_ab = -1
from mqtt import *
from machine import RTC
import ntptime
import time
from aiot_lcd1602 import LCD1602
from event_manager import *
from machine import Pin, SoftI2C
from aiot_dht20 import DHT20

aiot_lcd1602 = LCD1602()

event_manager.reset()

def on_mqtt_message_receive_callback__bbc_pump_(th_C3_B4ng_tin):
  global RT, RH, SM, LUX
  if th_C3_B4ng_tin == '1':
    pin10.write_analog(round(translate(100, 0, 100, 0, 1023)))
  else:
    pin10.write_analog(round(translate(0, 0, 100, 0, 1023)))

# Mô tả hàm này...
def _C4_90_C4_83ng_k_C3_AD_server():
  global th_C3_B4ng_tin, RT, RH, SM, LUX, aiot_dht20, aiot_lcd1602
  mqtt.on_receive_message('bbc-pump', on_mqtt_message_receive_callback__bbc_pump_)

aiot_dht20 = DHT20(SoftI2C(scl=Pin(22), sda=Pin(21)))

def on_event_timer_callback_S_f_E_A_W():
  global th_C3_B4ng_tin, RT, RH, SM, LUX
  aiot_dht20.read_dht20()
  RT = aiot_dht20.dht20_temperature()
  RH = aiot_dht20.dht20_humidity()
  SM = round(translate((pin0.read_analog()), 0, 4095, 0, 100))
  LUX = round(translate((pin2.read_analog()), 0, 4095, 0, 100))
  aiot_lcd1602.move_to(0, 0)
  aiot_lcd1602.putstr('RT:')
  aiot_lcd1602.move_to(3, 0)
  aiot_lcd1602.putstr(RT)
  aiot_lcd1602.move_to(7, 0)
  aiot_lcd1602.putstr('*C')
  aiot_lcd1602.move_to(10, 0)
  aiot_lcd1602.putstr('RH:')
  aiot_lcd1602.move_to(13, 0)
  aiot_lcd1602.putstr(RH)
  aiot_lcd1602.move_to(15, 0)
  aiot_lcd1602.putstr('%')
  aiot_lcd1602.move_to(0, 1)
  aiot_lcd1602.putstr('Lux:')
  aiot_lcd1602.move_to(4, 1)
  aiot_lcd1602.putstr(LUX)
  aiot_lcd1602.move_to(6, 1)
  aiot_lcd1602.putstr('%')
  aiot_lcd1602.move_to(9, 1)
  aiot_lcd1602.putstr('SM')
  aiot_lcd1602.move_to(13, 1)
  aiot_lcd1602.putstr(SM)
  aiot_lcd1602.move_to(15, 1)
  aiot_lcd1602.putstr('%')
  mqtt.publish('bbc-temp', RT)
  mqtt.publish('bbc-humi', RH)
  mqtt.publish('bbc-moisture', SM)
  mqtt.publish('bbc-light', LUX)

event_manager.add_timer_event(1000, on_event_timer_callback_S_f_E_A_W)

def on_event_timer_callback_R_C_U_G_h():
  global th_C3_B4ng_tin, RT, RH, SM, LUX
  if (round(translate((pin0.read_analog()), 0, 4095, 0, 100))) > 7:
    pin10.write_analog(round(translate(0, 0, 100, 0, 1023)))
    mqtt.publish('bbc-pump', '1')
  if (round(translate((pin0.read_analog()), 0, 4095, 0, 100))) <= 7:
    pin10.write_analog(round(translate(100, 0, 100, 0, 1023)))
    mqtt.publish('bbc-pump', '0')

event_manager.add_timer_event(1000, on_event_timer_callback_R_C_U_G_h)

if True:
  display.scroll('IOT')
  mqtt.connect_wifi('redmi', '123456789')
  mqtt.connect_broker(server='io.adafruit.com', port=1883, username='vananh2110211', password='aio_yvOA137AnyfMg0fRUHFpd1XXgwVQ')
  ntptime.settime()
  (year, month, mday, week_of_year, hour, minute, second, milisecond) = RTC().datetime()
  RTC().init((year, month, mday, week_of_year, hour+7, minute, second, milisecond))
  aiot_lcd1602.clear()
  _C4_90_C4_83ng_k_C3_AD_server()
  display.scroll('OK')

while True:
  event_manager.run()
  mqtt.check_message()
  time.sleep_ms(1000)