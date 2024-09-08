import { Component } from 'react';
import Scanner from './Scanner';
import { Link } from 'react-router-dom';
// import { Exception } from '@zxing/library';

class BarcodeScanner extends Component {
  state = {
    results: [],
    scanning: false,
    latestCode: '',
    modalVisible: false,
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = (result) => {
    try {
      // console.log(result && result.codeResult && result.codeResult.code);
      const code = result?.codeResult?.code;
      if (code) {
        this.setState(() => ({
          // results: [...prevState.results, result],
          scanning: false,
          latestCode: code,
          modalVisible: true,
        }));
        console.log(this.state.results)
      }

    } catch (e) {
      console.log(e);
    }
  };
  


  render() {
    return (
      <div>
        <Link to="/">
          <div style={{ marginRight: 10 }} color="secondary">
            &lt;
          </div>
        </Link>
        <span>Barcode Scanner</span>

        <div style={{ marginTop: 30, width: 640, height: 320 }}>
          <Scanner onDetected={this._onDetected} />
        </div>

        <textarea
          style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
          rows={3}
          value={this.state.latestCode || 'No data scanned'}
          readOnly
        />

        <textarea
          style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
          rows={3}
          value={String(this.state.modalVisible)}
          readOnly
        />

        {console.log(this.state.results)}

        <button onClick={() => {
          try {
            // console.log(this.state.results)
            if (this.state.results.length == 0 && this.state.latestCode !== '') {
              this.setState((prevState) => ({
                results: [...prevState.results, this.state.latestCode],
              }));
              
            }
            else if(!this.state.results.some(r => r === this.state.latestCode)){
              this.setState((prevState) => ({
                results: [...prevState.results, this.state.latestCode],
              }));
            }
            else {
              // console.log("not saved" + this.state.latestCode)
              throw new Error("not saved" + this.state.latestCode)
            }
            // console.log(this.state.results)

          }
          catch (e) {
            console.log(e.message)
          }

        }} >Save</button>

      </div>
    );
  }
}

export default BarcodeScanner;