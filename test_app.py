import websocket
import time
import _thread as thread


def on_message(ws, message):
    print("rsv: {}".format(message))

def on_error(ws, error):
    print("### error ###")
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    print("### open ###")
    def run(*args):
        time.sleep(1)

    thread.start_new_thread(run, ())

def ws_start(url="ws://localhost:3000/rs", on_open=on_open, on_message=on_message, on_error=on_error, on_close=on_close):
    ws = websocket.WebSocketApp(url = url,
                                on_open = on_open,
                                on_message = on_message,
                                on_error = on_error,
                                on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()


if __name__ == "__main__":
    ws_start(on_message=on_message)

