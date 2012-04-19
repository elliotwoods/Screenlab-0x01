from threading import Thread
import time
import signal
import sys
import OSC
import Queue

import logging
import tornado.escape
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.websocket
import os.path

import json

from tornado.options import define, options

define( "port", default=80, help="run on the given port", type=int )

queue = Queue.Queue()

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/websocket", OSCWebSocketHandler),
        ]
        settings = dict(
            cookie_secret="43oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
            template_path=os.path.join(os.path.dirname(__file__), "./"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=True,
            autoescape=None,
        )
        tornado.web.Application.__init__(self, handlers, **settings)


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

class OSCWebSocketHandler(tornado.websocket.WebSocketHandler):
    waiters = set()

    def open(self):
        OSCWebSocketHandler.waiters.add(self)
        OSCWebSocketHandler.update_coords()

    def on_close(self):
        OSCWebSocketHandler.waiters.remove(self)

    @classmethod
    def update_coords( self ):
        global queue
        while not queue.empty():
            a = queue.get()
            OSCWebSocketHandler.send_updates(json.dumps({"addr":a[0], "value":a[1]}))

    @classmethod
    def send_updates(cls, msg ):
        for waiter in cls.waiters:
            try:
                waiter.write_message( msg )
            except:
                pass

    def on_message(self, message):
        pass

def osc_handler( addr, tags, stuff, source):
    global queue
#    print addr, stuff
    queue.put( [addr, stuff] )


def signal_handler(signal, frame):
    print 'You pressed Ctrl+C!'
    sys.exit(0)

def main():
    signal.signal(signal.SIGINT, signal_handler)

    s = OSC.ThreadingOSCServer(("",8000)) # threading
    print "Creating OSCServer on port 8000..."
    s.addMsgHandler("/screenlab/skeleton/0", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/skeleton/1", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/skeleton/2", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/skeleton/3", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/skeleton/4", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/skeleton/5", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/skeleton/6", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/skeletonactive", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/1/view", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/1/projection", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/2/view", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/2/projection", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/3/view", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/3/projection", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/4/view", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/4/projection", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/5/view", osc_handler) # adding our function
    s.addMsgHandler("/screenlab/screenmatrix/5/projection", osc_handler) # adding our function
    st = Thread( target = s.serve_forever )
    st.start()

    tornado.options.parse_command_line()
    app = Application()
    app.listen(options.port)
    io_loop = tornado.ioloop.IOLoop.instance()
    tornado.ioloop.PeriodicCallback( OSCWebSocketHandler.update_coords, 15.0, io_loop=io_loop ).start()
    io_loop.start()

if __name__ == "__main__":
    main()