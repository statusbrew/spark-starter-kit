"""Hello unit test module."""

from ocr.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello ocr"
