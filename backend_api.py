#!/usr/bin/env python3
"""
Jyotishai Backend API Server
Lightweight FastAPI server for Vedic Astrology calculations
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from datetime import datetime
import math
from fpdf import FPDF
import io

class APIHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, content_type='application/json'):
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        if self.path == '/api/status':
            self._set_headers()
            response = {
                'status': 'operational',
                'service': 'Jyotishai Backend API',
                'version': '1.0.0',
                'timestamp': datetime.utcnow().isoformat() + 'Z'
            }
            self.wfile.write(json.dumps(response).encode())
            
        elif self.path == '/api/features':
            self._set_headers()
            response = {
                'features': [
                    'Vedic Birth Chart Calculation',
                    'Planetary Position Analysis',
                    'Dasha Period Calculations',
                    'Compatibility Matching',
                    'Muhurta Selection',
                    'Transit Predictions'
                ]
            }
            self.wfile.write(json.dumps(response).encode())
            
        elif self.path == '/api/planets':
            self._set_headers()
            # Sample planetary positions (simplified)
            response = {
                'timestamp': datetime.utcnow().isoformat() + 'Z',
                'planets': {
                    'Sun': {'longitude': 120.5, 'sign': 'Leo', 'house': 5},
                    'Moon': {'longitude': 45.2, 'sign': 'Taurus', 'house': 2},
                    'Mars': {'longitude': 230.8, 'sign': 'Scorpio', 'house': 8},
                    'Mercury': {'longitude': 135.3, 'sign': 'Virgo', 'house': 6},
                    'Jupiter': {'longitude': 195.6, 'sign': 'Libra', 'house': 7},
                    'Venus': {'longitude': 90.1, 'sign': 'Cancer', 'house': 4},
                    'Saturn': {'longitude': 280.4, 'sign': 'Capricorn', 'house': 10},
                    'Rahu': {'longitude': 15.7, 'sign': 'Aries', 'house': 1},
                    'Ketu': {'longitude': 195.7, 'sign': 'Libra', 'house': 7}
                }
            }
            self.wfile.write(json.dumps(response).encode())
            
        elif self.path == '/api/chart':
            self._set_headers()
            # Sample birth chart data
            response = {
                'chart_type': 'Rasi',
                'ascendant': 'Aries',
                'houses': [
                    {'house': 1, 'sign': 'Aries', 'planets': ['Rahu']},
                    {'house': 2, 'sign': 'Taurus', 'planets': ['Moon']},
                    {'house': 3, 'sign': 'Gemini', 'planets': []},
                    {'house': 4, 'sign': 'Cancer', 'planets': ['Venus']},
                    {'house': 5, 'sign': 'Leo', 'planets': ['Sun']},
                    {'house': 6, 'sign': 'Virgo', 'planets': ['Mercury']},
                    {'house': 7, 'sign': 'Libra', 'planets': ['Jupiter', 'Ketu']},
                    {'house': 8, 'sign': 'Scorpio', 'planets': ['Mars']},
                    {'house': 9, 'sign': 'Sagittarius', 'planets': []},
                    {'house': 10, 'sign': 'Capricorn', 'planets': ['Saturn']},
                    {'house': 11, 'sign': 'Aquarius', 'planets': []},
                    {'house': 12, 'sign': 'Pisces', 'planets': []}
                ]
            }
            self.wfile.write(json.dumps(response).encode())
            
        elif self.path == '/api/health':
            self._set_headers()
            response = {
                'status': 'healthy',
                'checks': {
                    'api': 'operational',
                    'database': 'not_configured',
                    'calculations': 'ready'
                }
            }
            self.wfile.write(json.dumps(response).encode())
            
        else:
            self._set_headers(404)
            response = {'error': 'Endpoint not found', 'path': self.path}
            self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        if self.path == '/api/calculate':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode())
                # Simple calculation example
                self._set_headers()
                response = {
                    'success': True,
                    'input': data,
                    'result': {
                        'message': 'Calculation completed',
                        'timestamp': datetime.utcnow().isoformat() + 'Z'
                    }
                }
                self.wfile.write(json.dumps(response).encode())
            except json.JSONDecodeError:
                self._set_headers(400)
                response = {'error': 'Invalid JSON data'}
                self.wfile.write(json.dumps(response).encode())
                
        elif self.path == '/api/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            
            if content_length == 0:
                self._set_headers(400)
                response = {'error': 'No data received'}
                self.wfile.write(json.dumps(response).encode())
                return
                
            post_data = self.rfile.read(content_length)
            
            try:
                raw_data = post_data.decode()
                data = json.loads(raw_data)
                self._set_headers()
                
                message = data.get('message', '')
                if not message:
                    response = {'error': 'Message is required'}
                    self.wfile.write(json.dumps(response).encode())
                    return
                
                # Generate AI-like astrological response
                responses = [
                    f"Based on your question about '{message}', I can offer some astrological insights. The cosmic energies suggest looking at this from a planetary perspective.",
                    f"Regarding '{message}', the stars indicate this is an important area for your spiritual growth. Consider how the current planetary transits might be influencing this situation.",
                    f"Your inquiry about '{message}' resonates with celestial wisdom. The alignment of planets suggests paying attention to your intuition and inner guidance.",
                    f"From an astrological standpoint, '{message}' relates to karmic patterns. The universe is guiding you toward balance and understanding in this matter.",
                    f"The cosmic energies around '{message}' suggest this is a time for reflection and spiritual insight. Trust the process of universal timing."
                ]
                
                # Simple response selection based on message content
                if any(word in message.lower() for word in ['love', 'relationship', 'partner', 'marriage']):
                    reply = f"In matters of the heart regarding '{message}', Venus and Mars energies play crucial roles. Your relationship sector is influenced by current planetary transits, suggesting a time for deeper emotional understanding and connection."
                elif any(word in message.lower() for word in ['career', 'job', 'work', 'business', 'money']):
                    reply = f"For career and financial matters concerning '{message}', Jupiter and Saturn aspects guide your professional path. The cosmic timing suggests focusing on long-term goals and practical achievements."
                elif any(word in message.lower() for word in ['health', 'wellness', 'body', 'healing']):
                    reply = f"Regarding health and wellness in relation to '{message}', the sixth house energies are significant. The planets suggest maintaining balance between mind, body, and spirit for optimal well-being."
                else:
                    import random
                    reply = random.choice(responses)
                
                response = {'reply': reply}
                self.wfile.write(json.dumps(response).encode())
                
            except json.JSONDecodeError as e:
                print(f"[ERROR] JSON decode error in /api/chat: {e}")
                self._set_headers(400)
                response = {'error': f'Invalid JSON data: {str(e)}'}
                self.wfile.write(json.dumps(response).encode())
                
        elif self.path == '/api/reports/create':
            content_length = int(self.headers.get('Content-Length', 0))
            print(f"[DEBUG] Content-Length: {content_length}")
            
            if content_length == 0:
                self._set_headers(400)
                response = {'error': 'No data received'}
                self.wfile.write(json.dumps(response).encode())
                return
            
            post_data = self.rfile.read(content_length)
            
            try:
                raw_data = post_data.decode()
                print(f"[DEBUG] Received data: {raw_data}")
                print(f"[DEBUG] Headers: {dict(self.headers)}")
                
                if not raw_data.strip():
                    self._set_headers(400)
                    response = {'error': 'Empty data received'}
                    self.wfile.write(json.dumps(response).encode())
                    return
                # Try to parse as JSON first
                try:
                    data = json.loads(raw_data)
                except json.JSONDecodeError:
                    from urllib.parse import parse_qs
                    if 'application/x-www-form-urlencoded' in self.headers.get('Content-Type', ''):
                        form_data = parse_qs(raw_data)
                        data = {k: v[0] if len(v) == 1 else v for k, v in form_data.items()}
                    else:
                        raise
                # Generate report ID and mock response
                timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
                report_id = f"RPT-{timestamp}"
                name = data.get('name', 'Unknown')
                birth_date = data.get('birthDate', data.get('birth_date', ''))
                birth_time = data.get('birthTime', data.get('birth_time', ''))
                birth_place = data.get('birthPlace', data.get('location', ''))
                report_type = data.get('reportType', 'comprehensive')
                analysis_map = {
                    'personality': 'Your personality analysis reveals strong leadership qualities and creative potential.',
                    'career': 'Your career prospects show excellent potential in business and technology fields.',
                    'health': 'Your health indicators suggest strong vitality with focus on balance and wellness.',
                    'love': 'Your relationship prospects are highly favorable with compatible partnerships ahead.',
                    'finance': 'Your financial outlook shows steady growth through careful planning and investments.',
                    'comprehensive': 'Your comprehensive analysis reveals a dynamic personality with excellent potential across all life areas.'
                }
                analysis = analysis_map.get(report_type, analysis_map['comprehensive'])
                # Generate PDF
                pdf = FPDF()
                pdf.add_page()
                pdf.set_font("Arial", size=14)
                pdf.cell(200, 10, txt="Astrology Report", ln=True, align='C')
                pdf.ln(10)
                pdf.set_font("Arial", size=12)
                pdf.cell(200, 10, txt=f"Report ID: {report_id}", ln=True)
                pdf.cell(200, 10, txt=f"Name: {name}", ln=True)
                pdf.cell(200, 10, txt=f"Birth Date: {birth_date}", ln=True)
                pdf.cell(200, 10, txt=f"Birth Time: {birth_time}", ln=True)
                pdf.cell(200, 10, txt=f"Birth Place: {birth_place}", ln=True)
                pdf.cell(200, 10, txt=f"Report Type: {report_type}", ln=True)
                pdf.ln(10)
                pdf.multi_cell(0, 10, txt=f"Analysis:\n{analysis}")
                pdf_output = io.BytesIO()
                pdf.output(pdf_output)
                pdf_data = pdf_output.getvalue()
                self._set_headers(200, 'application/pdf')
                self.send_header('Content-Disposition', f'attachment; filename="Astrology_Report_{report_id}.pdf"')
                self.end_headers()
                self.wfile.write(pdf_data)
            except json.JSONDecodeError as e:
                print(f"[ERROR] JSON decode error in /api/reports/create: {e}")
                print(f"[ERROR] Raw data was: {post_data}")
                self._set_headers(400)
                response = {'error': f'Invalid JSON data: {str(e)}'}
                self.wfile.write(json.dumps(response).encode())
                
        elif self.path == '/analyze' or self.path.startswith('/modules/'):
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode())
                self._set_headers()
                
                # Generate a mock astrology report based on input data
                name = data.get('name', 'Unknown')
                birth_date = data.get('birth_date', '')
                birth_time = data.get('birth_time', '')
                location = data.get('location', '')
                
                # Determine modules based on endpoint
                if self.path == '/analyze':
                    modules = data.get('modules', ['PERSONALITY'])
                else:
                    # Single module endpoint like /modules/personality
                    module_name = self.path.split('/')[-1].upper()
                    modules = [module_name]
                
                # Mock analysis results
                results = []
                for module in modules:
                    if module == 'PERSONALITY':
                        analysis = f"Based on your birth details, {name}, you possess strong leadership qualities and are naturally inclined towards creative pursuits. Your planetary positions suggest a dynamic personality with excellent communication skills."
                    elif module == 'CAREER':
                        analysis = f"Your birth chart indicates excellent potential in business, technology, or creative fields. The planetary alignments suggest success through innovation and collaboration."
                    elif module == 'HEALTH':
                        analysis = f"Your health indicators show strong vitality. Focus on maintaining balance between work and rest. Pay attention to digestive health and stress management."
                    elif module == 'MARRIAGE':
                        analysis = f"Your relationship prospects are favorable. You're likely to find a compatible partner who shares your values and ambitions. Timing suggests positive developments in the coming years."
                    else:
                        analysis = f"Analysis for {module} module: Your birth chart shows positive influences in this area of life with potential for growth and success."
                    
                    results.append({
                        'module': module,
                        'analysis': analysis
                    })
                
                # Format response based on endpoint
                if self.path == '/analyze':
                    response = {
                        'name': name,
                        'results': results,
                        'report_path': None
                    }
                else:
                    # Single module endpoint - return just the analysis text
                    response = {
                        'analysis': results[0]['analysis'] if results else 'Analysis not available',
                        'module': modules[0] if modules else 'UNKNOWN'
                    }
                
                self.wfile.write(json.dumps(response).encode())
                
            except json.JSONDecodeError:
                self._set_headers(400)
                response = {'error': 'Invalid JSON data'}
                self.wfile.write(json.dumps(response).encode())
        else:
            self._set_headers(404)
            response = {'error': 'Endpoint not found'}
            self.wfile.write(json.dumps(response).encode())

    def log_message(self, format, *args):
        # Custom logging
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {format % args}")

def run_server(port=8002):
    server_address = ('', port)
    httpd = HTTPServer(server_address, APIHandler)
    print(f'Jyotishai Backend API Server running on port {port}')
    print(f'Available endpoints:')
    print(f'  GET  /api/status   - Server status')
    print(f'  GET  /api/features - Available features')
    print(f'  GET  /api/planets  - Current planetary positions')
    print(f'  GET  /api/chart    - Sample birth chart')
    print(f'  GET  /api/health   - Health check')
    print(f'  POST /api/calculate - Perform calculations')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()