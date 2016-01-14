jest.dontMock('../src/unit/accordionComponent');

describe('Accordion', function() {
  var React = require('react-tools');
  var TestUtils = React.addons.TestUtils;
  var Accordion;

  beforeEach(function() {
    Accordion = require('../src/unit/accordionComponent');
  });

  it('should exists', function() {
    // Render into document
    var accordion = TestUtils.renderIntoDocument( <Accordion /> );
    expect(TestUtils.isCompositeComponent(accordion)).toBeTruthy();
  });
});