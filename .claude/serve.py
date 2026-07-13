"""Static file server that avoids os.getcwd() (python -m http.server calls it
at import time via argparse's default=os.getcwd(), which can raise
PermissionError under a sandboxed cwd)."""
import functools
import http.server
import os
import sys

DIRECTORY = os.path.dirname(os.path.dirname(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8743

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIRECTORY)
httpd = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), handler)
print(f"Serving {DIRECTORY} at http://0.0.0.0:{PORT}")
httpd.serve_forever()
