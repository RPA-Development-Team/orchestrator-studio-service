  const request = require('supertest')
  const app = require('../app');
  

  describe('Test GET /api/packages/:id',() => {
      test('It should respond with 200 success and JSON content type', async () => {
          const packageId = '16';        
          const response = await request(app)
          .get(`/api/packages/${packageId}`)
          .expect('Content-Type',/json; charset=utf-8/)
          .expect(200);
        });
  })

  describe('Test GET /api/packages/user/:id',() => {
      test('It should respond with 200 success and JSON content type', async () => {
          const userId = '16';        
          const response = await request(app)
          .get(`/api/packages/user/${userId}`)
          .expect('Content-Type',/json; charset=utf-8/)
          .expect(200);
        });
  })

  describe('Test POST /api/packages/create/', () => {
      test('It should respond with 201 Created and return the created resource', async () => {
        const requestBody = { packageName:"RPA final",
          date:"23-04-28",
          xamlFile:"77uPEFjdGl2aXR5IG1jOklnbm9yYWJsZT0ic2FkcyBzYXAiIHg6Q2xhc3M9Ik1pY3Jvc29mdC5TYW1wbGVzLldvcmtmbG93Ig0KIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL25ldGZ4LzIwMDkveGFtbC9hY3Rpdml0aWVzIg0KIHhtbG5zOmI9ImNsci1uYW1lc3BhY2U6QnJvd3Nlcl9FbmdpbmU7YXNzZW1ibHk9QnJvd3Nlci1FbmdpbmUiDQogeG1sbnM6aT0iY2xyLW5hbWVzcGFjZTpJT19Nb2R1bGVzO2Fzc2VtYmx5PUlPLU1vZHVsZXMiDQogeG1sbnM6bWM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9tYXJrdXAtY29tcGF0aWJpbGl0eS8yMDA2Ig0KIHhtbG5zOm12YT0iY2xyLW5hbWVzcGFjZTpNaWNyb3NvZnQuVmlzdWFsQmFzaWMuQWN0aXZpdGllczthc3NlbWJseT1TeXN0ZW0uQWN0aXZpdGllcyINCiB4bWxuczpvcz0iY2xyLW5hbWVzcGFjZTpPcGVuUUEuU2VsZW5pdW07YXNzZW1ibHk9V2ViRHJpdmVyIg0KIHhtbG5zOm9zcj0iY2xyLW5hbWVzcGFjZTpPcGVuUUEuU2VsZW5pdW0uUmVtb3RlO2Fzc2VtYmx5PVdlYkRyaXZlciINCiB4bWxuczpwPSJjbHItbmFtZXNwYWNlOlByb2Nlc3Nlc19Db250cm9sO2Fzc2VtYmx5PVByb2Nlc3NlcyBDb250cm9sIg0KIHhtbG5zOnM9ImNsci1uYW1lc3BhY2U6U2hvcnRjdXRzO2Fzc2VtYmx5PVNob3J0Y3V0cyINCiB4bWxuczpzMT0iY2xyLW5hbWVzcGFjZTpTeXN0ZW07YXNzZW1ibHk9U3lzdGVtLkNvcmUiDQogeG1sbnM6czI9ImNsci1uYW1lc3BhY2U6U3lzdGVtO2Fzc2VtYmx5PW1zY29ybGliIg0KIHhtbG5zOnMzPSJjbHItbmFtZXNwYWNlOlN5c3RlbTthc3NlbWJseT1TeXN0ZW0iDQogeG1sbnM6czQ9ImNsci1uYW1lc3BhY2U6U3lzdGVtO2Fzc2VtYmx5PVN5c3RlbS5TZXJ2aWNlTW9kZWwiDQogeG1sbnM6czU9ImNsci1uYW1lc3BhY2U6U3lzdGVtO2Fzc2VtYmx5PVN5c3RlbS5Db21wb25lbnRNb2RlbC5Db21wb3NpdGlvbiINCiB4bWxuczpzNj0iY2xyLW5hbWVzcGFjZTpTeXN0ZW07YXNzZW1ibHk9U3lzdGVtLlJ1bnRpbWUuV2luZG93c1J1bnRpbWUiDQogeG1sbnM6c2E9ImNsci1uYW1lc3BhY2U6U3lzdGVtLkFjdGl2aXRpZXM7YXNzZW1ibHk9U3lzdGVtLkFjdGl2aXRpZXMiDQogeG1sbnM6c2Fkcz0iaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9uZXRmeC8yMDEwL3hhbWwvYWN0aXZpdGllcy9kZWJ1Z2dlciINCiB4bWxuczpzYXA9Imh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vbmV0ZngvMjAwOS94YW1sL2FjdGl2aXRpZXMvcHJlc2VudGF0aW9uIg0KIHhtbG5zOnNjZz0iY2xyLW5hbWVzcGFjZTpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYzthc3NlbWJseT1tc2NvcmxpYiINCiB4bWxuczp3PSJjbHItbmFtZXNwYWNlOldvcmtmbG93QWN0aXZpdGllczthc3NlbWJseT1BY3Rpdml0aWVzVGVzdExpcHJhcmllcyINCiB4bWxuczp4PSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbCI+DQogIDx4Ok1lbWJlcnM+DQogICAgPHg6UHJvcGVydHkgTmFtZT0iV2ViRHJpdmVyIiBUeXBlPSJPdXRBcmd1bWVudChvczpJV2ViRHJpdmVyKSIgLz4NCiAgPC94Ok1lbWJlcnM+DQogIDxzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPjM2NC44LDgyMC44PC9zYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPg0KICA8bXZhOlZpc3VhbEJhc2ljLlNldHRpbmdzPkFzc2VtYmx5IHJlZmVyZW5jZXMgYW5kIGltcG9ydGVkIG5hbWVzcGFjZXMgZm9yIGludGVybmFsIGltcGxlbWVudGF0aW9uPC9tdmE6VmlzdWFsQmFzaWMuU2V0dGluZ3M+DQogIDxTZXF1ZW5jZSBzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPSIzMjQuOCw3ODAuOCI+DQogICAgPFNlcXVlbmNlLlZhcmlhYmxlcz4NCiAgICAgIDxWYXJpYWJsZSB4OlR5cGVBcmd1bWVudHM9Ing6U3RyaW5nIiBEZWZhdWx0PSJbeF0iIE5hbWU9IngiIC8+DQogICAgICA8VmFyaWFibGUgeDpUeXBlQXJndW1lbnRzPSJ4OlN0cmluZyIgTmFtZT0iZHJpdmVyIiAvPg0KICAgICAgPFZhcmlhYmxlIHg6VHlwZUFyZ3VtZW50cz0ieDpTdHJpbmciIE5hbWU9Im91dGJ1dHRleHQiIC8+DQogICAgICA8VmFyaWFibGUgeDpUeXBlQXJndW1lbnRzPSJ4OkludDMyIiBOYW1lPSJub3RlcGFkSUQiIC8+DQogICAgPC9TZXF1ZW5jZS5WYXJpYWJsZXM+DQogICAgPHNhcDpXb3JrZmxvd1ZpZXdTdGF0ZVNlcnZpY2UuVmlld1N0YXRlPg0KICAgICAgPHNjZzpEaWN0aW9uYXJ5IHg6VHlwZUFyZ3VtZW50cz0ieDpTdHJpbmcsIHg6T2JqZWN0Ij4NCiAgICAgICAgPHg6Qm9vbGVhbiB4OktleT0iSXNFeHBhbmRlZCI+VHJ1ZTwveDpCb29sZWFuPg0KICAgICAgPC9zY2c6RGljdGlvbmFyeT4NCiAgICA8L3NhcDpXb3JrZmxvd1ZpZXdTdGF0ZVNlcnZpY2UuVmlld1N0YXRlPg0KICAgIDxiOk9wZW5fQnJvd3NlciBCcm93c2VySWQ9Ilt4XSIgRHJpdmVyPSJbV2ViRHJpdmVyXSIgRHJpdmVyUGF0aD0iRDpcR3JhZHVhdGlvbiBQcm9qZWN0XFByb2plY3QgZnJvbSBHaXRcUlBBX1NsYXllclxBY3Rpdml0aWVzXEN1c3RvbSBBY2l0aXZpdGllc1xCcm93c2VyLUVuZ2luZVxCcm93c2VyLURyaXZlciIgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsMjIuNCIgVXJsPSJodHRwczovL3d3dy5nb29nbGUuY29tLmVnLyIgLz4NCiAgICA8aTpLZXlib2FyZENvbnRyb2wgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsMjIuNCIgVGV4dD0id2VhdGhlciIgLz4NCiAgICA8YjpDbGlja19FbGVtZW50IERyaXZlcj0iW1dlYkRyaXZlcl0iIHNhcDpWaXJ0dWFsaXplZENvbnRhaW5lclNlcnZpY2UuSGludFNpemU9IjMwMi40LDIyLjQiIFNlbGVjdG9yPSJpbnB1dFt0eXBlPSdzdWJtaXQnXSIgLz4NCiAgICA8YjpHZXRfRWxlbWVudF9UZXh0IERyaXZlcj0iW1dlYkRyaXZlcl0iIHNhcDpWaXJ0dWFsaXplZENvbnRhaW5lclNlcnZpY2UuSGludFNpemU9IjMwMi40LDIyLjQiIFNlbGVjdG9yVGV4dD0iI3dvYl90bSIgVGV4dD0iW291dGJ1dHRleHRdIiAvPg0KICAgIDxiOkNsb3NlX0Jyb3dzZXIgRHJpdmVyPSJbV2ViRHJpdmVyXSIgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsMjIuNCIgLz4NCiAgICA8cDpvcGVuX2FwcCBBcHBQYXRoPSJDOlxVc2Vyc1xvbWFyZVxPbmVEcml2ZVxEZXNrdG9wXHdlYXRoZXIudHh0IiBzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPSIzMDIuNCw2Mi40IiBQcm9jZXNzSWQ9Iltub3RlcGFkSURdIiAvPg0KICAgIDxzOlNlbGVjdEFsbCBzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPSIzMDIuNCwyMi40IiAvPg0KICAgIDxpOktleWJvYXJkQ29udHJvbCBzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPSIzMDIuNCwyMi40IiBUZXh0PSJbJnF1b3Q7V2VhdGhlciBOb3c6JnF1b3Q7K291dGJ1dHRleHRdIiAvPg0KICAgIDxzOlNhdmUgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsMjIuNCIgLz4NCiAgICA8cDpjbG9zZV9hcHAgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsNTQuNCIgUHJvY2Vzc0lkPSJbbm90ZXBhZElEXSIgLz4NCiAgPC9TZXF1ZW5jZT4NCjwvQWN0aXZpdHk+",
          time:"21:42:06",
          description: "said" };
    
        const response = await request(app)
          .post('/api/packages/create/')
          .send(requestBody)
          .expect('Content-Type', /json; charset=utf-8/)
          .expect(201);
          expect(response.body).toHaveProperty('message', 'Form data saved successfully');
      });
    });

  describe('Test DELETE /api/packages/:id',() => {
      test('It should respond with 200 success and JSON content type', async () => {
          const packageId = '16';
          const response = await request(app)
          .delete(`/api/packages/${packageId}`)
          .expect(200);
          expect(response.body).toHaveProperty('message', 'Package deleted');

        });
  })

  describe('Test PUT /api/packages/:id', () => {
      test('It should respond with 200 success and JSON content type', async () => {
        const packageId = '20';
        const requestBody = {
          name: "final update",
          description: "updated"
        };
        const response = await request(app)
          .put(`/api/packages/${packageId}`)
          .send(requestBody)
          .expect('Content-Type', /json; charset=utf-8/)
          .expect(200);
        expect(response.body).toHaveProperty('message', 'Package updated successfully');
      });
    });
    
    describe('Test POST /api/packages/add/', () => {
      test('It should respond with 201 Created and return the created resource', async () => {
        const requestBody ={
          name:"jjjjj",
          data:"77uPEFjdGl2aXR5IG1jOklnbm9yYWJsZT0ic2FkcyBzYXAiIHg6Q2xhc3M9Ik1pY3Jvc29mdC5TYW1wbGVzLldvcmtmbG93Ig0KIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL25ldGZ4LzIwMDkveGFtbC9hY3Rpdml0aWVzIg0KIHhtbG5zOmI9ImNsci1uYW1lc3BhY2U6QnJvd3Nlcl9FbmdpbmU7YXNzZW1ibHk9QnJvd3Nlci1FbmdpbmUiDQogeG1sbnM6aT0iY2xyLW5hbWVzcGFjZTpJT19Nb2R1bGVzO2Fzc2VtYmx5PUlPLU1vZHVsZXMiDQogeG1sbnM6bWM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9tYXJrdXAtY29tcGF0aWJpbGl0eS8yMDA2Ig0KIHhtbG5zOm12YT0iY2xyLW5hbWVzcGFjZTpNaWNyb3NvZnQuVmlzdWFsQmFzaWMuQWN0aXZpdGllczthc3NlbWJseT1TeXN0ZW0uQWN0aXZpdGllcyINCiB4bWxuczpvcz0iY2xyLW5hbWVzcGFjZTpPcGVuUUEuU2VsZW5pdW07YXNzZW1ibHk9V2ViRHJpdmVyIg0KIHhtbG5zOm9zcj0iY2xyLW5hbWVzcGFjZTpPcGVuUUEuU2VsZW5pdW0uUmVtb3RlO2Fzc2VtYmx5PVdlYkRyaXZlciINCiB4bWxuczpwPSJjbHItbmFtZXNwYWNlOlByb2Nlc3Nlc19Db250cm9sO2Fzc2VtYmx5PVByb2Nlc3NlcyBDb250cm9sIg0KIHhtbG5zOnM9ImNsci1uYW1lc3BhY2U6U2hvcnRjdXRzO2Fzc2VtYmx5PVNob3J0Y3V0cyINCiB4bWxuczpzMT0iY2xyLW5hbWVzcGFjZTpTeXN0ZW07YXNzZW1ibHk9U3lzdGVtLkNvcmUiDQogeG1sbnM6czI9ImNsci1uYW1lc3BhY2U6U3lzdGVtO2Fzc2VtYmx5PW1zY29ybGliIg0KIHhtbG5zOnMzPSJjbHItbmFtZXNwYWNlOlN5c3RlbTthc3NlbWJseT1TeXN0ZW0iDQogeG1sbnM6czQ9ImNsci1uYW1lc3BhY2U6U3lzdGVtO2Fzc2VtYmx5PVN5c3RlbS5TZXJ2aWNlTW9kZWwiDQogeG1sbnM6czU9ImNsci1uYW1lc3BhY2U6U3lzdGVtO2Fzc2VtYmx5PVN5c3RlbS5Db21wb25lbnRNb2RlbC5Db21wb3NpdGlvbiINCiB4bWxuczpzNj0iY2xyLW5hbWVzcGFjZTpTeXN0ZW07YXNzZW1ibHk9U3lzdGVtLlJ1bnRpbWUuV2luZG93c1J1bnRpbWUiDQogeG1sbnM6c2E9ImNsci1uYW1lc3BhY2U6U3lzdGVtLkFjdGl2aXRpZXM7YXNzZW1ibHk9U3lzdGVtLkFjdGl2aXRpZXMiDQogeG1sbnM6c2Fkcz0iaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9uZXRmeC8yMDEwL3hhbWwvYWN0aXZpdGllcy9kZWJ1Z2dlciINCiB4bWxuczpzYXA9Imh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vbmV0ZngvMjAwOS94YW1sL2FjdGl2aXRpZXMvcHJlc2VudGF0aW9uIg0KIHhtbG5zOnNjZz0iY2xyLW5hbWVzcGFjZTpTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYzthc3NlbWJseT1tc2NvcmxpYiINCiB4bWxuczp3PSJjbHItbmFtZXNwYWNlOldvcmtmbG93QWN0aXZpdGllczthc3NlbWJseT1BY3Rpdml0aWVzVGVzdExpcHJhcmllcyINCiB4bWxuczp4PSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbCI+DQogIDx4Ok1lbWJlcnM+DQogICAgPHg6UHJvcGVydHkgTmFtZT0iV2ViRHJpdmVyIiBUeXBlPSJPdXRBcmd1bWVudChvczpJV2ViRHJpdmVyKSIgLz4NCiAgPC94Ok1lbWJlcnM+DQogIDxzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPjM2NC44LDgyMC44PC9zYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPg0KICA8bXZhOlZpc3VhbEJhc2ljLlNldHRpbmdzPkFzc2VtYmx5IHJlZmVyZW5jZXMgYW5kIGltcG9ydGVkIG5hbWVzcGFjZXMgZm9yIGludGVybmFsIGltcGxlbWVudGF0aW9uPC9tdmE6VmlzdWFsQmFzaWMuU2V0dGluZ3M+DQogIDxTZXF1ZW5jZSBzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPSIzMjQuOCw3ODAuOCI+DQogICAgPFNlcXVlbmNlLlZhcmlhYmxlcz4NCiAgICAgIDxWYXJpYWJsZSB4OlR5cGVBcmd1bWVudHM9Ing6U3RyaW5nIiBEZWZhdWx0PSJbeF0iIE5hbWU9IngiIC8+DQogICAgICA8VmFyaWFibGUgeDpUeXBlQXJndW1lbnRzPSJ4OlN0cmluZyIgTmFtZT0iZHJpdmVyIiAvPg0KICAgICAgPFZhcmlhYmxlIHg6VHlwZUFyZ3VtZW50cz0ieDpTdHJpbmciIE5hbWU9Im91dGJ1dHRleHQiIC8+DQogICAgICA8VmFyaWFibGUgeDpUeXBlQXJndW1lbnRzPSJ4OkludDMyIiBOYW1lPSJub3RlcGFkSUQiIC8+DQogICAgPC9TZXF1ZW5jZS5WYXJpYWJsZXM+DQogICAgPHNhcDpXb3JrZmxvd1ZpZXdTdGF0ZVNlcnZpY2UuVmlld1N0YXRlPg0KICAgICAgPHNjZzpEaWN0aW9uYXJ5IHg6VHlwZUFyZ3VtZW50cz0ieDpTdHJpbmcsIHg6T2JqZWN0Ij4NCiAgICAgICAgPHg6Qm9vbGVhbiB4OktleT0iSXNFeHBhbmRlZCI+VHJ1ZTwveDpCb29sZWFuPg0KICAgICAgPC9zY2c6RGljdGlvbmFyeT4NCiAgICA8L3NhcDpXb3JrZmxvd1ZpZXdTdGF0ZVNlcnZpY2UuVmlld1N0YXRlPg0KICAgIDxiOk9wZW5fQnJvd3NlciBCcm93c2VySWQ9Ilt4XSIgRHJpdmVyPSJbV2ViRHJpdmVyXSIgRHJpdmVyUGF0aD0iRDpcR3JhZHVhdGlvbiBQcm9qZWN0XFByb2plY3QgZnJvbSBHaXRcUlBBX1NsYXllclxBY3Rpdml0aWVzXEN1c3RvbSBBY2l0aXZpdGllc1xCcm93c2VyLUVuZ2luZVxCcm93c2VyLURyaXZlciIgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsMjIuNCIgVXJsPSJodHRwczovL3d3dy5nb29nbGUuY29tLmVnLyIgLz4NCiAgICA8aTpLZXlib2FyZENvbnRyb2wgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsMjIuNCIgVGV4dD0id2VhdGhlciIgLz4NCiAgICA8YjpDbGlja19FbGVtZW50IERyaXZlcj0iW1dlYkRyaXZlcl0iIHNhcDpWaXJ0dWFsaXplZENvbnRhaW5lclNlcnZpY2UuSGludFNpemU9IjMwMi40LDIyLjQiIFNlbGVjdG9yPSJpbnB1dFt0eXBlPSdzdWJtaXQnXSIgLz4NCiAgICA8YjpHZXRfRWxlbWVudF9UZXh0IERyaXZlcj0iW1dlYkRyaXZlcl0iIHNhcDpWaXJ0dWFsaXplZENvbnRhaW5lclNlcnZpY2UuSGludFNpemU9IjMwMi40LDIyLjQiIFNlbGVjdG9yVGV4dD0iI3dvYl90bSIgVGV4dD0iW291dGJ1dHRleHRdIiAvPg0KICAgIDxiOkNsb3NlX0Jyb3dzZXIgRHJpdmVyPSJbV2ViRHJpdmVyXSIgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsMjIuNCIgLz4NCiAgICA8cDpvcGVuX2FwcCBBcHBQYXRoPSJDOlxVc2Vyc1xvbWFyZVxPbmVEcml2ZVxEZXNrdG9wXHdlYXRoZXIudHh0IiBzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPSIzMDIuNCw2Mi40IiBQcm9jZXNzSWQ9Iltub3RlcGFkSURdIiAvPg0KICAgIDxzOlNlbGVjdEFsbCBzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPSIzMDIuNCwyMi40IiAvPg0KICAgIDxpOktleWJvYXJkQ29udHJvbCBzYXA6VmlydHVhbGl6ZWRDb250YWluZXJTZXJ2aWNlLkhpbnRTaXplPSIzMDIuNCwyMi40IiBUZXh0PSJbJnF1b3Q7V2VhdGhlciBOb3c6JnF1b3Q7K291dGJ1dHRleHRdIiAvPg0KICAgIDxzOlNhdmUgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsMjIuNCIgLz4NCiAgICA8cDpjbG9zZV9hcHAgc2FwOlZpcnR1YWxpemVkQ29udGFpbmVyU2VydmljZS5IaW50U2l6ZT0iMzAyLjQsNTQuNCIgUHJvY2Vzc0lkPSJbbm90ZXBhZElEXSIgLz4NCiAgPC9TZXF1ZW5jZT4NCjwvQWN0aXZpdHk+",
          version:"2",
          description:"description"
    }
    
        const response = await request(app)
          .post('/api/packages/add/')
          .send(requestBody)
          .expect('Content-Type', /json; charset=utf-8/)
          .expect(201);
          expect(response.body).toHaveProperty('message', 'Form library saved successfully');
      });
    });

    describe('Test GET /api/libraries/', () => {
      test('It should respond with 200 success and JSON content type', async () => {
        const response = await request(app)
        .get('/api/libraries/')
        .expect('Content-Type',/json; charset=utf-8/)
        .expect(200);
      });
    });
