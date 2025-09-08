import logging

def setup_logger():
    logger = logging.getLogger("url_shortener")
    logger.setLevel(logging.INFO)
    handler = logging.FileHandler("app.log")
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger
